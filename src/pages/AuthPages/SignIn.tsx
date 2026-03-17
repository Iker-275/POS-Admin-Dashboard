import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import AuthForm from "../../components/customforms/AuthForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign In"
        description="Sign In to access your dashboard"
      />
      <AuthLayout>
        <AuthForm mode="signin" />
        {/* <SignInForm /> */}
      </AuthLayout>
    </>
  );
}
