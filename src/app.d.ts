// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace jest {
  interface Matchers<R> {
    toRenderComponent(component: () => JSX.Element): R;
  }
}
