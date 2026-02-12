import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface UpdateURLParams {
  router: AppRouterInstance;
  basePath: string;
  params: Record<string, string | number | boolean | null | undefined>;
  excludeEmpty?: boolean;
  excludeValues?: (string | number | boolean)[];
}

export const updateURL = ({
  router,
  basePath,
  params,
  excludeEmpty = true,
  excludeValues = [],
}: UpdateURLParams) => {
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    // Skip if value is null or undefined
    if (value === null || value === undefined) {
      return;
    }

    // Skip if excludeEmpty is true and value is empty string
    if (excludeEmpty && value === "") {
      return;
    }

    // Skip if value is in excludeValues array
    if (excludeValues.includes(value)) {
      return;
    }

    urlParams.set(key, String(value));
  });

  const queryString = urlParams.toString();
  const newUrl = queryString ? `${basePath}?${queryString}` : basePath;

  router.replace(newUrl, { scroll: false });
};
