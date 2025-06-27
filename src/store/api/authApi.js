import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://alibackend.duckdns.org'

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const publicEndpoints = ['signup', 'signin', 'getTerms', 'sendSupportRequest', 'verifyOtp', 'resendOtp']
    
    if (!publicEndpoints.includes(endpoint)) {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
    }
    
    if (['createChat', 'addMessageToChat'].includes(endpoint)) {
      headers.set('Content-Type', 'text/plain')
    } else {
      headers.set('Content-Type', 'application/json')
    }
    
    headers.set('Accept', 'application/json')
    return headers
  },
})

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Sign Up
    signup: builder.mutation({
      query: (credentials) => ({
        url: '/authentication_app/signup/',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Sign In
    signin: builder.mutation({
      query: (credentials) => ({
        url: '/authentication_app/signin/',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Logout
    logout: builder.mutation({
      query: () => ({
        url: '/authentication_app/logout/',
        method: 'POST',
      }),
    }),
    
    // Get User Profile
    getUserProfile: builder.query({
      query: () => '/authentication_app/user_profile/',
      providesTags: ['User'],
    }),
    
    // Update User Profile
    updateUserProfile: builder.mutation({
      query: (profileData) => ({
        url: '/authentication_app/user_profile/',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['User'],
    }),

    // OTP Verification
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: '/authentication_app/verify_otp/',
        method: 'POST',
        body: otpData,
      }),
    }),

    // Resend OTP
    resendOtp: builder.mutation({
      query: (emailData) => ({
        url: '/authentication_app/resend_otp/',
        method: 'POST',
        body: emailData,
      }),
    }),

    // User Log (Settings)
    getUserLog: builder.query({
      query: () => '/authentication_app/settings/user_log/',
      providesTags: ['User'],
    }),

    // Get Terms
    getTerms: builder.query({
      query: () => '/terms_and_support/terms/',
    }),

    // Support Request
    sendSupportRequest: builder.mutation({
      query: (supportData) => ({
        url: '/terms_and_support/support/',
        method: 'POST',
        body: supportData,
      }),
    }),

    // Company User Management - Add User
    addCompanyUser: builder.mutation({
      query: (userData) => ({
        url: '/company_user_management/add_user/',
        method: 'POST',
        body: userData,
      }),
    }),

    // Chat Endpoints
    createChat: builder.mutation({
      query: (message) => ({
        url: '/chat/create_chat/',
        method: 'POST',
        body: message,
      }),
    }),

    addMessageToChat: builder.mutation({
      query: (message) => ({
        url: '/chat/add_message_to_chat/',
        method: 'POST',
        body: message,
      }),
    }),

    getUserChatList: builder.query({
      query: () => '/chat/get_users_chat_list/',
      providesTags: ['User'],
    }),

    // Subscription Management
    buySubscription: builder.mutation({
      query: (subscriptionData) => ({
        url: '/subscription/buy_subscription/',
        method: 'POST',
        body: subscriptionData,
      }),
    }),

    updateSubscription: builder.mutation({
      query: (subscriptionData) => ({
        url: '/subscription/update_subscription/',
        method: 'PUT',
        body: subscriptionData,
      }),
    }),

    // Company User Management - Get User List
    getCompanyUserList: builder.query({
      query: () => '/company_user_management/user_list/',
      providesTags: ['User'],
    }),
  }),
})

export const {
  useSignupMutation,
  useSigninMutation,
  useLogoutMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useGetUserLogQuery,
  useGetTermsQuery,
  useSendSupportRequestMutation,
  useAddCompanyUserMutation,
  useCreateChatMutation,
  useAddMessageToChatMutation,
  useGetUserChatListQuery,
  useBuySubscriptionMutation,
  useUpdateSubscriptionMutation,
  useGetCompanyUserListQuery,
} = authApi
