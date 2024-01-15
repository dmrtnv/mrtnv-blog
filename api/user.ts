import api from '@/lib/api';

export async function deleteMe() {
  try {
    const result = await api.delete('/me');
    console.log(result.data);
  } catch (err) {
    console.error(err);
  }
}
