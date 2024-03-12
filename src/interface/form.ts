export interface IForm {
  user: {
    id?: string;
    email: string;
    name: string;
  };
}

export interface FormProps {
  mode: "create" | "update";
}
