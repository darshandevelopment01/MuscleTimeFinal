import { Link } from "expo-router";
import { openBrowserAsync, WebBrowserPresentationStyle } from "expo-web-browser";

export function ExternalLink({ href, ...rest }) {
  return (
    <Link
      {...rest}
      href={href}
      target="_blank"
      onPress={async (event) => {
        if (process.env.EXPO_OS !== "web") {
          // Prevent default browser behavior on native
          event.preventDefault();

          // Open inside in-app browser
          await openBrowserAsync(href, {
            presentationStyle:
              WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}