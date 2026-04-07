export interface LoaderState {
  isLoading: boolean;
  showLoader: boolean;
}

export const initialLoaderState: LoaderState = {
  isLoading: false,
  showLoader: false,
};
