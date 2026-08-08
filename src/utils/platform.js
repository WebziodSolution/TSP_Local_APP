import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType } from '@capacitor/camera';

import { Filesystem, Directory } from '@capacitor/filesystem';

export const isNative = () => Capacitor.isNativePlatform();
export const platform = () => Capacitor.getPlatform(); // 'android', 'ios', or 'web'

export const checkCameraPermission = async () => {
    try {
        const permission = await Camera.requestPermissions();
        if (permission.camera !== 'granted') {
            throw new Error("Camera permission not granted.");
        }

    } catch (error) {
        throw new Error("Failed to check camera permission: " + error.message);
    }
};

export const pickImage = async () => {
    if (!isNative()) {
        return null;
    }
    try {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
        });
        
        if (image && image.webPath) {
            const response = await fetch(image.webPath);
            const blob = await response.blob();
            const ext = image.format || 'jpeg';
            const fileName = `upload_${Date.now()}.${ext}`;
            const file = new File([blob], fileName, { type: blob.type || `image/${ext}` });
            return { file, webPath: image.webPath };
        }
    } catch (error) {
        console.error("Error picking image:", error);
    }
    return null;
};

export const savePdf = async (pdf, filename) => {
    if (!isNative()) {
        pdf.save(filename);
        return { success: true, isWeb: true };
    }
    try {
        const base64String = pdf.output('datauristring').split(',')[1];
        const result = await Filesystem.writeFile({
            path: filename,
            data: base64String,
            directory: Directory.Documents,
        });
        return { success: true, path: result.uri };
    } catch (error) {
        console.error("Error saving PDF:", error);
        return { success: false, error: error.message };
    }
};