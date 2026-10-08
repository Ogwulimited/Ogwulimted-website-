import { getAccessToken } from './firebase';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
}

export const fetchWorkspaceFiles = async (): Promise<DriveFile[]> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated');

  // Fetch only non-folder files, limit to 5
  const query = "mimeType != 'application/vnd.google-apps.folder' and trashed = false";
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&orderBy=modifiedTime desc&pageSize=5&fields=files(id,name,mimeType,modifiedTime)`;
  
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch files from Google Drive');
  }

  const data = await response.json();
  return data.files || [];
};
