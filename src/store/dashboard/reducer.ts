import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface File {
    file: any,
    id: string | null,
    progress: number | null;
    uploaded: boolean;
    error: boolean;
}

interface Menu {
    selectedConfigMenu: string,
    selectedConfigMenuTitle: string,
}

interface DashboardStoreType {
    uploadingImagesPreview: [File] | [],
    selectedConfigMenu: string,
    selectedConfigMenuTitle: string;
}

const INITIAL_STATE: DashboardStoreType = {
    uploadingImagesPreview: [],
    selectedConfigMenu: '',
    selectedConfigMenuTitle: '',
}

const sliceDashboard = createSlice({
    name: 'dashboard',
    initialState: INITIAL_STATE,
    reducers: {
        updateUploadingImagesPreview(state, { payload }: PayloadAction<[File]>) {
            return { ...state, uploadingImagesPreview: payload }
        },
        setSelectedConfigMenu(state, { payload }: PayloadAction<Menu>) {
            return {
                ...state,
                selectedConfigMenu: payload?.selectedConfigMenu,
                selectedConfigMenuTitle: payload?.selectedConfigMenuTitle
            }
        }
    }
});

export default sliceDashboard.reducer;
export const {
    updateUploadingImagesPreview,
    setSelectedConfigMenu,
} = sliceDashboard.actions;

export const useDashboard = (state: any) => {
    return state.dashboard as DashboardStoreType;
}
