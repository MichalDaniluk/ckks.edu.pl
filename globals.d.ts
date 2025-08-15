declare module '*.css';
declare module '@components/*';
declare module '@utils/*';
declare module '@containers/*';
declare module '@types/*';
declare module "*.module.css";
declare module "*.module.scss";
declare module "*.scss" {
  const content: { [key: string]: any };
  export = content;
}
