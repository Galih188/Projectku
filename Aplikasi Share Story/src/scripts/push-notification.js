export function generateUnauthenticatedNavigationListTemplate() {
  return `
    <li id="push-notification-tools" class="push-notification-tools"></li>
  `;
}

export function generateAuthenticatedNavigationListTemplate() {
  return `
    <li id="push-notification-tools" class="push-notification-tools"></li>
  `;
}

export function generateSubscribeButtonTemplate() {
  return `
      <button id="subscribe-button" class="btn subscribe-button">
        Subscribe
      </button>
    `;
}

export function generateUnsubscribeButtonTemplate() {
  return `
      <button id="unsubscribe-button" class="btn unsubscribe-button">
        Unsubscribe
      </button>
    `;
}
