import { baseApi } from "./baseApi";

export const quotationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchCities: builder.query({
      query: () => "/location",
      providesTags: ["City"],
      keepUnusedDataFor: 300,
      transformResponse: (response) => response?.data ?? [],
    }),

    fetchTourPackages: builder.query({
      query: (params) => ({
        url: "/tour-requests",
        params,
      }),
      providesTags: ["TourRequests"],
      keepUnusedDataFor: 300,
      transformResponse: (response) => response?.data ?? [],
    }),

    fetchSuppliersByCity: builder.query({
      query: (cityCodes) => {
        const queryString = cityCodes
          .map((c) => `cityCodes=${encodeURIComponent(c)}`)
          .join("&");
        return `/suppliers?${queryString}`;
      },
      transformResponse: (response) => response?.data ?? [],
      keepUnusedDataFor: 300,
      providesTags: ["Supplier"],
    }),

    fetchSuggestedOptionalTourResult: builder.query({
      query: (cityCodes) => {
        const queryString = cityCodes
          .map((c) => `cityCodes=${encodeURIComponent(c)}`)
          .join("&");
        return `/excursions?${queryString}`;
      },
      transformResponse: (response) => response?.data ?? [],
      keepUnusedDataFor: 300,
      providesTags: ["Excursions"],
    }),

    fetchDaysData: builder.query({
      query: ({ cityCode, day }) => ({
        url: "/itinerary/options/services",
        params: {
          cityCode,
          day,
        },
      }),
      providesTags: ["daysData"],
      keepUnusedDataFor: 300,
      transformResponse: (response) => response?.data ?? [],
    }),

    
  }),
});

export const {
  useFetchCitiesQuery,
  useLazyFetchTourPackagesQuery,
  useLazyFetchSuppliersByCityQuery,
  useLazyFetchSuggestedOptionalTourResultQuery,
  useFetchTourPackagesQuery,
  useFetchSuppliersByCityQuery,
  useFetchSuggestedOptionalTourResultQuery,
  useFetchDaysDataQuery,
  useLazyFetchDaysDataQuery,
} = quotationApi;
