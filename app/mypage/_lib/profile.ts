export type User = {
  userId: number;
  userName: string;
  email: string;
  profile: string;
};

const token = 'token';
export const getUser = async () => {
  const res = await fetch('http://localhost:9090/api/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('failed fetch user data');
  }
  return res.json();
};

export const updateUser = async (formData: FormData) => {
  const res = await fetch('http://localhost:9090/api/auths/edit/user', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!res.ok) {
    throw new Error('Failed to update user data');
  }
  return res.json();
};
