
import { supabaseAdmin } from './supabase';

/**
 * Helper function to ensure the avatars storage bucket exists
 */
export const ensureAvatarsBucketExists = async () => {
  try {
    // Check if the bucket already exists
    const { data: existingBuckets, error: getBucketError } = await supabaseAdmin
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
      const { error: createBucketError } = await supabaseAdmin
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
    
    // First try with listBuckets
    const { data: buckets, error: listError } = await supabaseAdmin
      .storage
      .listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return false;
    }
    
    // Check if bucket exists in the list
    const bucketExists = buckets.some(bucket => bucket.id === 'images');
    
    if (bucketExists) {
      console.log('Confirmed images bucket exists via bucket list');
      return true;
    }
    
    // If not found in the list, try to create it
    console.log('Images bucket not found in list, attempting to create');
    
    const { error: createError } = await supabaseAdmin
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
    const { data, error } = await supabaseAdmin
      .storage
      .from(bucketName)
      .list('', {
        limit: 1
      });
    
    if (error) {
      console.error(`Error verifying ${bucketName} bucket access:`, error);
      return false;
    }
    
    console.log(`Successfully verified ${bucketName} bucket access`);
    return true;
  } catch (error) {
    console.error(`Unhandled error verifying ${bucketName} bucket:`, error);
    return false;
  }
};
