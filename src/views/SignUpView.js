import SignUpComponent from "../components/SignUpComponent";


function SignUpView(props) {
  const onRegister = (username, password) => {
    //TODO
  };

  const onCancel = () => {
    props.history.push("/");
  }

  //TODO modify props.user
  return (
      <SignUpComponent
          user={null}
          onRegister={onRegister}
          onCancel={onCancel}
      />
  );
}

export default SignUpView;
