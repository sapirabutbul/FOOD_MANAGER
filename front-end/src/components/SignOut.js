import { withRouter } from "react-router-dom";

const SignOut = (props) => {
  props.loadUser({
    user: {
      id: null,
      name: null,
      email: null,
      joined: null,
    },
    token: null,
  });
  props.history.push("/");
  return <></>;
};
export default withRouter(SignOut);
