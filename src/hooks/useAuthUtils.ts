import { Auth } from '@supabase/auth-ui-react';
import { useCommentsContext } from '../components/CommentsProvider';

// run callback if authenticated
const useAuthUtils = () => {
  const auth = Auth.useUser();
  const { onAuthRequested } = useCommentsContext();

  const isAuthenticated = !!auth.session;

  const runIfAuthenticated = (callback: Function) => {
    if (!isAuthenticated) {
      onAuthRequested?.();
    } else {
      callback();
    }
  };

  return {
    runIfAuthenticated,
    isAuthenticated,
    auth,
  };
};

export default useAuthUtils;
