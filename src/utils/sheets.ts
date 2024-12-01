interface FormData {
  fullName: string;
  email: string;
  state: string;
  district?: string;
  farmSize?: string;
  crops?: string;
}

export const submitToGoogleSheets = async (formData: FormData) => {
  try {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwr4TcU4li2QyRYtwKt6l5ayRzGysG24-qqtZxrgoplfc2e0TsYiT_h8_M7lr_I4O4/exec';
    
    // Enhanced input validation
    const validationRules = {
      fullName: (value: string) => 
        value.trim().length >= 2 || 'Full name must be at least 2 characters long',
      
      email: (value: string) => 
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address',
      
      state: (value: string) => 
        value.trim().length >= 2 || 'State/Region must be at least 2 characters long',
      
      farmSize: (value: string | undefined) => 
        !value || (!isNaN(Number(value)) && Number(value) >= 0) || 'Farm size must be a valid positive number'
    };

    // Validate all fields
    const errors: string[] = [];
    Object.entries(validationRules).forEach(([field, validator]) => {
      const value = formData[field as keyof FormData] as string | undefined;
      const result = validator(value || '');
      if (typeof result === 'string') errors.push(result);
    });

    if (errors.length > 0) {
      throw new Error(errors[0]);
    }

    // Prepare the form data
    const payload = {
      ...formData,
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      state: formData.state.trim(),
      district: formData.district?.trim() || '',
      farmSize: formData.farmSize?.trim() || '',
      crops: formData.crops?.trim() || '',
      source: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    // First, try with CORS mode
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        mode: 'cors'
      });

      if (response.ok) {
        const data = await response.json();
        return {
          result: 'success',
          message: data.message || 'Successfully joined the waitlist!'
        };
      }
    } catch (corsError) {
      console.log('CORS request failed, falling back to no-cors mode');
    }

    // Fallback to no-cors mode if CORS fails
    await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      mode: 'no-cors'
    });

    // With no-cors mode, we can't read the response
    // But if we got here without throwing, assume success
    return {
      result: 'success',
      message: 'Successfully joined the waitlist!'
    };

  } catch (error) {
    console.error('Form submission error:', error);
    
    // Enhanced error handling
    if (error instanceof Error) {
      // Handle specific error types
      if (error.message.includes('NetworkError') || 
          error.message.includes('Failed to fetch') ||
          error.message.includes('Network request failed')) {
        throw new Error(
          'Unable to connect to the server. Please check your internet connection and try again.'
        );
      }

      // Handle validation errors
      if (error.message.includes('must be') || 
          error.message.includes('Please enter')) {
        throw error;
      }

      // Handle other specific error cases
      if (error.message.includes('timeout')) {
        throw new Error('Request timed out. Please try again.');
      }

      // Use the error message if it exists, otherwise use a generic message
      throw new Error(
        error.message || 'An error occurred while submitting the form. Please try again later.'
      );
    }
    
    // Generic error handler
    throw new Error('An unexpected error occurred. Please try again later.');
  }
};