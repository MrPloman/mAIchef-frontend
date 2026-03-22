export interface LoaderState {
  isLoading: boolean;
  message: string | null;
}

export const initialLoaderState: LoaderState = {
  isLoading: false,
  message: null,
};
