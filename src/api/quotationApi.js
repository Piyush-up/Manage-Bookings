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

    fetchGeoLocations: builder.query({
      query: (cityNames) => ({
        url: "/location/geo",
        params: { names: cityNames },
      }),
      transformResponse: (response) => {
        return response?.data ?? response?.data ?? [];
      },
    }),

    fetchSuppliersByGeo: builder.query({
      query: (cityName) => {
        if (!cityName) {
          throw new Error("cityName is required");
        }

        return {
          url: `/suppliers/by-city/${cityName}`, // directly use string
        };
      },
      transformResponse: (response) => {
        return response?.data ?? [];
      },
      providesTags: ["SupplierGeo"],
      keepUnusedDataFor: 300,
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
  useFetchGeoLocationsQuery,
  useLazyFetchGeoLocationsQuery,
  useFetchSuppliersByGeoQuery,
  useLazyFetchSuppliersByGeoQuery,
} = quotationApi;
