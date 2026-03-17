import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import AuthForm from "../../components/customforms/AuthForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Sign Up"
        description="Create your account"
      />
      <AuthLayout>
        <AuthForm mode="signup" />
        {/* <SignUpForm /> */}
      </AuthLayout>
    </>
  );
}
