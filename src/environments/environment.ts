export const environment = {
  production: false,
  apiUrl: 'https://fakestoreapi.com',
  paymentSandbox: {
    provider: 'Stripe Sandbox',
    tokenEndpoint: 'https://api.stripe.com/v1/tokens',
    // Puedes reemplazarla por tu Publishable Key gratuita de dashboard.stripe.com/test/apikeys
    publicKey: 'pk_test_51SandboxTallerCortes2026PublicKeyDemo',
  },
};