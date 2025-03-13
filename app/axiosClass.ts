import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import nookies from 'nookies';
import qs from 'qs';

interface RefreshTokenResponse {
  jwt: string;
}

class AxiosClient {
  private baseURL: string;
  private refreshUrl: string;
  private loginUrl: string;

  constructor(baseURL: any, refreshUrl: string, loginUrl: string) {
    this.baseURL = baseURL;
    this.refreshUrl = refreshUrl;
    this.loginUrl = loginUrl;

    // Axios instance configuration
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Ensures cookies are sent with requests
    });

    // Intercept requests to add JWT token to headers if available
    this.instance.interceptors.request.use(this.addAuthHeader, this.handleError);

    // Intercept responses to handle 403 errors
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      this.handleResponseError.bind(this)
    );
  }

  private instance: any;

  // Add JWT token to request headers if available
  private addAuthHeader(config: AxiosRequestConfig): AxiosRequestConfig {
    const token = this.getToken();
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  }

  // Retrieve JWT token from cookies (Next.js example using nookies)
  private getToken(): string | undefined {
    const cookies = nookies.get();
    return cookies.jwtToken; // Adjust the cookie key as needed
  }

  // Retrieve refresh token from cookies (Next.js example)
  private getRefreshToken(): string | undefined {
    const cookies = nookies.get();
    return cookies.refreshToken; // Adjust the cookie key as needed
  }

  // Handle errors during response
  private async handleResponseError(error: any): Promise<any> {
    if (error.response && error.response.status === 403) {
      // Handle 403 error (JWT expired or invalid)
      const refreshToken = this.getRefreshToken();
      if (refreshToken) {
        try {
          const newToken = await this.refreshToken(refreshToken);
          if (newToken) {
            // Retry the original request with the new JWT token
            error.config.headers['Authorization'] = `Bearer ${newToken}`;
            return axios(error.config); // Retry the request
          }
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          // If refresh token is invalid or expired, redirect to login
          if (typeof window !== 'undefined') {
            window.location.href = this.loginUrl; // Redirect to login page
          }
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = this.loginUrl; // Redirect to login page
        }
        return Promise.reject(error);
      }
    }

    // For any other errors, reject the promise with the error
    return Promise.reject(error);
  }

  // Refresh the JWT token using the refresh token
  private async refreshToken(refreshToken: string): Promise<string> {
    try {
      const response = await axios.post<RefreshTokenResponse>(
        this.refreshUrl,
        qs.stringify({ refresh_token: refreshToken }),
        {
          withCredentials: true, // Important to send credentials (cookies) when refreshing token
        }
      );
      if (response.data && response.data.jwt) {
        // Save the new JWT token (e.g., in cookies)
        nookies.set(null, 'jwtToken', response.data.jwt, { path: '/' });
        return response.data.jwt;
      }
      throw new Error('Failed to refresh token');
    } catch (error) {
      console.error('Error refreshing JWT:', error);
      throw error; // Propagate the error
    }
  }

  // Handle general errors in requests
  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  // Example GET request
  public async get(endpoint: string, config: AxiosRequestConfig = {}): Promise<any> {
    try {
      const response = await this.instance.get(endpoint, config);
      return response.data;
    } catch (error) {
      return Promise.reject(error); // This will be handled by the response interceptor
    }
  }

  // Example POST request
  public async post(endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    try {
      const response = await this.instance.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      return Promise.reject(error); // This will be handled by the response interceptor
    }
  }
}

export default AxiosClient;
