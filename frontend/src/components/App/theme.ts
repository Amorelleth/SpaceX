import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      ":root": {
        "--chakra-colors-gray-100": "var(--color-paper)",
      },
    },
  },

  components: {
    Input: {
      variants: {
        filled: {
          field: {
            _focus: {
              bg: "var(--color-paper)",
            },
          },
        },
      },
    },
    Select: {
      variants: {
        filled: {
          field: {
            _focus: {
              bg: "var(--color-paper)",
            },
          },
        },
      },
    },
  },
});
