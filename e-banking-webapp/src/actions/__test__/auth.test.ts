// Libs
import { AuthError } from 'next-auth';
import { revalidateTag } from 'next/cache';

// Interfaces
import {
  AccountType,
  AuthResponse,
  CurrencyUnit,
  TChangePasswordFormData,
  TChangePasswordSuccessResponse,
  TSignInFormData,
  TSignUpPayload,
} from '@/interfaces';

// Constants
import { API_ENDPOINTS, ERROR_MESSAGES, TAGS } from '@/constants';

// Mocks
import { MOCK_DATA_USER } from '@/mocks';

// Configs
import {
  signIn,
  signOut as nextAuthSignOut,
  unstable_update,
} from '@/config/auth';

// Services
import { httpClient } from '@/services/http-client';

// Actions
import {
  addAccount,
  addCard,
  addNewCardByAccountId,
  authenticateUser,
  changePassword,
  getUser,
  signOut,
  signUp,
  updateEmailSettings,
  updateUser,
} from '@/actions/auth';

jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

jest.mock('@/services/http-client', () => ({
  httpClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  },
}));

jest.mock('@/config/auth', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  unstable_update: jest.fn(),
}));

describe('authenticateUser', () => {
  const mockSignInData: TSignInFormData = {
    identifier: 'john@example.com',
    password: 'password123',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call signIn with credentials and form data', async () => {
    await authenticateUser(mockSignInData);

    expect(signIn).toHaveBeenCalledTimes(1);
    expect(signIn).toHaveBeenCalledWith('credentials', mockSignInData);
  });

  it('should return error message when signIn throws an instance of AuthError', async () => {
    const authErrorInstance = new AuthError('Invalid credentials');

    (signIn as jest.Mock).mockRejectedValueOnce(authErrorInstance);

    const result = await authenticateUser(mockSignInData);

    expect(signIn).toHaveBeenCalledTimes(1);
    expect(result).toBe(ERROR_MESSAGES.ACCOUNT_AND_PASSWORD_INVALID);
  });

  it('should throw error if signIn throws a non-AuthError', async () => {
    const unknownError = new Error('Unknown error');
    (signIn as jest.Mock).mockRejectedValueOnce(unknownError);

    await expect(authenticateUser(mockSignInData)).rejects.toThrow(
      unknownError,
    );
  });
});

describe('signUp', () => {
  const mockSignUpData: TSignUpPayload = {
    email: 'test@example.com',
    password: 'password123',
    username: 'testuser',
  };

  const mockAuthResponse: AuthResponse = {
    jwt: 'mock-jwt-token',
    user: {
      id: 1,
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      username: 'testuser',
      phone: '',
      country: '',
      postal: '',
      avatar: '',
    },
  };

  const mockResponse = {
    data: mockAuthResponse,
    pagination: null,
    error: undefined,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully create a new user ', async () => {
    (httpClient.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await signUp(mockSignUpData);

    expect(httpClient.post).toHaveBeenCalledTimes(1);
    expect(httpClient.post).toHaveBeenCalledWith(
      API_ENDPOINTS.SIGN_UP,
      mockSignUpData,
    );
    expect(result).toEqual(mockResponse);
  });
});

describe('signOut', () => {
  it('should call signOut with correct redirect', async () => {
    await signOut();

    expect(nextAuthSignOut).toHaveBeenCalledTimes(1);
    expect(nextAuthSignOut).toHaveBeenCalledWith({
      redirect: false,
    });
  });
});

describe('changePassword', () => {
  const mockJwt = 'mock-jwt-token';

  const mockPayload: TChangePasswordFormData = {
    currentPassword: 'OldPassword123!',
    password: 'NewPassword456!',
    passwordConfirmation: 'NewPassword456!',
  };

  const mockResponse: TChangePasswordSuccessResponse = {
    id: 1,
    documentId: '12345',
    username: 'johnDoe',
    email: 'john@example.com',
    provider: 'local',
    confirmed: true,
    blocked: false,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    publishedAt: '2023-01-01T00:00:00Z',
    postal: '12345',
    phone: '+123456789',
    country: 'US',
    avatar: 'https://example.com/avatar.png',
    jwt: mockJwt,
    token: 'new-jwt-token',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully change password and return the user data', async () => {
    (httpClient.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await changePassword(mockPayload, mockJwt);

    expect(httpClient.post).toHaveBeenCalledTimes(1);
    expect(httpClient.post).toHaveBeenCalledWith(
      API_ENDPOINTS.CHANGE_PASSWORD,
      mockPayload,
      {
        headers: { Authorization: `Bearer ${mockJwt}` },
      },
    );
    expect(result).toEqual(mockResponse);
  });
});

describe('updateUser', () => {
  const mockId = 1;
  const mockPayload = MOCK_DATA_USER;
  const mockResponse = { data: { ...mockPayload } };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the user successfully and call unstable_update', async () => {
    (httpClient.put as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await updateUser(mockId, mockPayload);

    expect(httpClient.put).toHaveBeenCalledWith(
      `${API_ENDPOINTS.USERS}/${mockId}`,
      mockPayload,
    );
    expect(unstable_update).toHaveBeenCalledWith({ user: mockResponse.data });
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw SIGN_UP_ERROR when AuthError occurs', async () => {
    (httpClient.put as jest.Mock).mockRejectedValueOnce(new AuthError());

    await expect(updateUser(mockId, mockPayload)).rejects.toBe(
      ERROR_MESSAGES.SIGN_UP_ERROR,
    );

    expect(httpClient.put).toHaveBeenCalledWith(
      `${API_ENDPOINTS.USERS}/${mockId}`,
      mockPayload,
    );
  });
});

describe('addAccount', () => {
  const mockId = 1;
  const mockPayload = {
    data: {
      accountNumber: '1234567890',
      balance: 1000,
      type: 'Savings' as AccountType,
      currency: '$' as CurrencyUnit,
      name: 'John Doe',
    },
  };
  const mockResponse = {
    data: {
      id: mockId,
      accountNumber: '1234567890',
      balance: 1000,
      type: 'Savings' as AccountType,
      currency: '$' as CurrencyUnit,
      name: 'John Doe',
    },
    meta: {
      pagination: { page: 1, pageSize: 10, pageCount: 1, total: 1 },
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an account successfully', async () => {
    (httpClient.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await addAccount(mockPayload);

    expect(httpClient.post).toHaveBeenCalledWith(
      API_ENDPOINTS.ACCOUNTS,
      mockPayload,
    );

    expect(result).toEqual(mockResponse.data);
  });

  it('should throw SIGN_UP_ERROR when AuthError occurs', async () => {
    (httpClient.post as jest.Mock).mockRejectedValueOnce(new AuthError());

    await expect(addAccount(mockPayload)).rejects.toBe(
      ERROR_MESSAGES.SIGN_UP_ERROR,
    );

    expect(httpClient.post).toHaveBeenCalledWith(
      API_ENDPOINTS.ACCOUNTS,
      mockPayload,
    );
  });
});

describe('addCard', () => {
  const mockId = 1;
  const mockPayload = {
    data: {
      cardNumber: '0123456789012',
      holderName: 'John Doe',
      ccv: '333',
      expireAt: '25/06',
    },
  };
  const mockResponse = {
    data: {
      id: mockId,
      cardNumber: '0123456789012',
      holderName: 'John Doe',
      ccv: '333',
      expireAt: '25/06',
    },
    meta: {
      pagination: { page: 1, pageSize: 10, pageCount: 1, total: 1 },
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a card successfully', async () => {
    (httpClient.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await addCard(mockPayload);

    expect(httpClient.post).toHaveBeenCalledWith(
      API_ENDPOINTS.CARDS,
      mockPayload,
    );

    expect(result).toEqual(mockResponse.data);
  });

  it('should throw SIGN_UP_ERROR when AuthError occurs', async () => {
    (httpClient.post as jest.Mock).mockRejectedValueOnce(new AuthError());

    await expect(addCard(mockPayload)).rejects.toBe(
      ERROR_MESSAGES.SIGN_UP_ERROR,
    );

    expect(httpClient.post).toHaveBeenCalledWith(
      API_ENDPOINTS.CARDS,
      mockPayload,
    );
  });
});

describe('updateEmailSettings', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update email setting successfully', async () => {
    await updateEmailSettings(MOCK_DATA_USER.id, MOCK_DATA_USER);

    expect(httpClient.put).toHaveBeenCalledWith(
      `${API_ENDPOINTS.USERS}/${MOCK_DATA_USER.id}`,
      MOCK_DATA_USER,
    );

    expect(revalidateTag).toHaveBeenCalledWith(TAGS.USERS);
  });
});

describe('getUser', () => {
  const mockResponse = {
    data: MOCK_DATA_USER,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user information correctly', async () => {
    (httpClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await getUser(MOCK_DATA_USER.id);

    expect(httpClient.get).toHaveBeenCalledWith(
      `${API_ENDPOINTS.USERS}/${MOCK_DATA_USER.id}`,
    );

    expect(result).toEqual(mockResponse.data);
  });

  it('should throw SIGN_UP_ERROR when AuthError occurs', async () => {
    (httpClient.get as jest.Mock).mockRejectedValueOnce(new AuthError());

    await expect(getUser(MOCK_DATA_USER.id)).rejects.toBe(
      ERROR_MESSAGES.SIGN_UP_ERROR,
    );

    expect(httpClient.get).toHaveBeenCalledWith(
      `${API_ENDPOINTS.USERS}/${MOCK_DATA_USER.id}`,
    );
  });
});

describe('addNewCardByAccountId', () => {
  const mockAccountId = 'testAccountId';
  const mockPayload = {
    cardNumber: '0123456789012',
    holderName: 'John Doe',
    ccv: '333',
    expireAt: '25/06',
  };
  const mockResponse = {
    data: {
      id: 1,
      cardNumber: '0123456789012',
      holderName: 'John Doe',
      ccv: '333',
      expireAt: '25/06',
    },
    meta: {
      pagination: { page: 1, pageSize: 10, pageCount: 1, total: 1 },
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a card by accountId successfully', async () => {
    (httpClient.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await addNewCardByAccountId(mockAccountId, mockPayload);

    expect(httpClient.post).toHaveBeenCalledWith(API_ENDPOINTS.CARDS, {
      data: {
        ...mockPayload,
        account: {
          connect: [mockAccountId],
        },
      },
    });

    expect(revalidateTag).toHaveBeenCalledWith(TAGS.CARD);

    expect(result).toEqual(mockResponse.data);
  });

  it('should throw ADD_CARD_FAILED when AuthError occurs', async () => {
    (httpClient.post as jest.Mock).mockRejectedValueOnce(new AuthError());

    await expect(
      addNewCardByAccountId(mockAccountId, mockPayload),
    ).rejects.toBe(ERROR_MESSAGES.ADD_CARD_FAILED);

    expect(httpClient.post).toHaveBeenCalledWith(API_ENDPOINTS.CARDS, {
      data: {
        ...mockPayload,
        account: {
          connect: [mockAccountId],
        },
      },
    });
  });
});
