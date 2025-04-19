import { supabase } from '@/integrations/supabase/client';

/**
 * Helper function to ensure the avatars storage bucket exists
 */
export const ensureAvatarsBucketExists = async () => {
  try {
    // Check if the bucket already exists
    const { data: existingBuckets, error: getBucketError } = await supabase
      .storage
      .listBuckets();
    
    if (getBucketError) {
      console.error('Error checking buckets:', getBucketError);
      return false;
    }
    
    // Check if the avatars bucket already exists
    const avatarsBucketExists = existingBuckets.some(bucket => bucket.name === 'avatars');
    
    if (!avatarsBucketExists) {
      // Create the avatars bucket
      const { error: createBucketError } = await supabase
        .storage
        .createBucket('avatars', {
          public: true, // Make the bucket public
        });
        
      if (createBucketError) {
        console.error('Error creating avatars bucket:', createBucketError);
        return false;
      }
      
      console.log('Created avatars bucket successfully');
    } else {
      console.log('Avatars bucket already exists');
    }
    
    return true;
  } catch (error) {
    console.error('Error in ensureAvatarsBucketExists:', error);
    return false;
  }
};

/**
 * Helper function to ensure the images storage bucket exists
 * This updated function has improved error handling and verification
 */
export const ensureImagesBucketExists = async () => {
  try {
    console.log('Checking if images bucket exists');
    
    // Try direct bucket access first as the most reliable method
    const { data: listResult, error: listError } = await supabase
      .storage
      .from('images')
      .list('', { limit: 1 });
    
    if (!listError) {
      console.log('Successfully verified images bucket via direct access');
      return true;
    }
    
    console.log('Direct bucket access failed, trying to create bucket');
    
    // If bucket doesn't exist, try to create it
    const { error: createError } = await supabase
      .storage
      .createBucket('images', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
      });
    
    // Check if creation was successful  
    if (createError) {
      console.error('Error creating images bucket:', createError);
      
      // Special handling for "Duplicate" errors which actually mean the bucket exists
      if (createError.message && createError.message.includes('duplicate')) {
        console.log('Bucket already exists (detected from error)');
        return true;
      }
      
      // For other errors, try one more verification
      const { data: verifyData, error: verifyError } = await supabase
        .storage
        .getBucket('images');
        
      if (!verifyError && verifyData) {
        console.log('Bucket exists despite creation error');
        return true;
      }
      
      return false;
    }
    
    console.log('Successfully created images bucket');
    return true;
  } catch (error) {
    console.error('Unhandled error in ensureImagesBucketExists:', error);
    return false;
  }
};

/**
 * Verify that a bucket exists by trying to list files in it
 * This is a more reliable way to check if a bucket is working correctly
 */
export const verifyBucketAccess = async (bucketName: string) => {
  try {
    console.log(`Verifying access to ${bucketName} bucket`);
    
    // Try to list files in the bucket (with limit 1 for efficiency)
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .list('', {
        limit: 1
      });
    
    if (error) {
      console.error(`Error verifying ${bucketName} bucket access:`, error);
      
      // Try an alternative method - check if bucket exists
      const { data: bucketData, error: bucketError } = await supabase
        .storage
        .getBucket(bucketName);
        
      if (!bucketError && bucketData) {
        console.log(`${bucketName} bucket exists but list operation failed`);
        return true;
      }
      
      return false;
    }
    
    console.log(`Successfully verified ${bucketName} bucket access`);
    return true;
  } catch (error) {
    console.error(`Unhandled error verifying ${bucketName} bucket:`, error);
    return false;
  }
};

/**
 * Creates the images bucket with proper policies if it doesn't exist
 * This is a more comprehensive approach to ensure the bucket is properly set up
 */
export const setupImagesBucket = async () => {
  try {
    const bucketExists = await ensureImagesBucketExists();
    
    if (!bucketExists) {
      console.error('Failed to create or verify images bucket');
      return false;
    }
    
    // Verify access to confirm bucket is properly configured
    const hasAccess = await verifyBucketAccess('images');
    
    if (!hasAccess) {
      console.error('Images bucket exists but lacks proper access');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in setupImagesBucket:', error);
    return false;
  }
};

/**
 * Upload an image to the images bucket
 * This function handles the complete flow - ensuring bucket exists and uploading
 */
export const uploadImageToBucket = async (file: File, folderPath: string = 'blog') => {
  try {
    // First ensure the bucket exists and is accessible
    const bucketReady = await setupImagesBucket();
    
    if (!bucketReady) {
      throw new Error('Storage bucket not properly configured');
    }
    
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
    const filePath = `${folderPath}/${fileName}`;
    
    console.log(`Uploading file to ${filePath}`);
    
    // Upload the file
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);
      
    console.log('File uploaded successfully. Public URL:', publicUrl);
    
    return publicUrl;
  } catch (error) {
    console.error('Error in uploadImageToBucket:', error);
    throw error;
  }
};
