type JSXComponent = () => JSX.Element;
export interface IRoutes {
  component: JSXComponent;
  exact: boolean;
  name: string;
  path: string;
}
