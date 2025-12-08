import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: [user?.email, "role"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      console.log("Fetching role for:", user.email);
      const res = await axiosPublic.get(`/users/${user.email}`);
      console.log("Role received:", res.data?.role);
      return res.data?.role;
    },
  });

  return [role, roleLoading];
};

export default useRole;
