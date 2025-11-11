declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
type Action = string | ((formData: FormData) => Promise<{ message: string }>);
