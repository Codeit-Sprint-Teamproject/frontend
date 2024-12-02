export type User = {
  teamId: string;
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// 임시 api로부터 받은 토큰 입력하세요
const token = '';

export const getUser = async (): Promise<User> => {
  const res = await fetch(
    'https://fe-adv-project-together-dallaem.vercel.app/aa/auths/user',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error('Failed to fetch user info');
  }
  return res.json();
};

export const updateUser = async (formData: FormData): Promise<User> => {
  const res = await fetch(
    'https://fe-adv-project-together-dallaem.vercel.app/aa/auths/user',
    {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error('Failed to fetch user info');
  }
  return res.json();
};
