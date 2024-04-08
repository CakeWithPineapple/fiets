const AuthLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="h-full flex items-center justify-center">
      <div className="max-w-full">
        {children}
      </div>
    </div>
  );
}
 
export default AuthLayout;