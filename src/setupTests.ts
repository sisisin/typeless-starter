import { ReactTestRenderer } from 'react-test-renderer';

expect.extend({
  toRenderComponent(received: ReactTestRenderer, component: () => JSX.Element) {
    const pass = received.root.findAllByType(component)[0]?.type === component;
    if (pass) {
      return {
        message: () => `expected node not to render component \`${component.name}\``,
        pass,
      };
    } else {
      return { message: () => `expected node to render component \`${component.name}\``, pass };
    }
  },
});
