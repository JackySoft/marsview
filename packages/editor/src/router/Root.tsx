import { useEffect } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import Header from '@/layout/components/Header';
import { UserInfoStore, usePageStore } from '@/stores/pageStore';
export default function Root() {
  const loaderData = useLoaderData();
  const saveUserInfo = usePageStore((state) => state.saveUserInfo);

  useEffect(() => {
    if (loaderData) {
      saveUserInfo(loaderData as UserInfoStore);
    }
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
