
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
 * Note: This function only checks if the bucket exists and does not try to create policies
 * as we're handling policies via SQL migrations
 */
export const ensureImagesBucketExists = async () => {
  try {
    console.log('Checking if images bucket exists');
    
    // Check if the bucket already exists
    const { data: existingBuckets, error: getBucketError } = await supabaseAdmin
      .storage
      .listBuckets();
    
    if (getBucketError) {
      console.error('Error checking buckets:', getBucketError);
      return false;
    }
    
    // Check if the images bucket already exists
    const imagesBucketExists = existingBuckets?.some(bucket => bucket.name === 'images');
    
    if (imagesBucketExists) {
      console.log('Images bucket confirmed to exist');
      return true;
    } else {
      console.log('Images bucket does not exist, will attempt to create it');
      
      // Create the images bucket
      const { error: createBucketError } = await supabaseAdmin
        .storage
        .createBucket('images', {
          public: true, // Make the bucket public
        });
        
      if (createBucketError) {
        console.error('Error creating images bucket:', createBucketError);
        
        // If this is a policy error, it's possible the bucket was actually created
        // Let's check again to be sure
        const { data: checkBuckets } = await supabaseAdmin
          .storage
          .listBuckets();
          
        const bucketNowExists = checkBuckets?.some(bucket => bucket.name === 'images');
        
        if (bucketNowExists) {
          console.log('Images bucket exists despite creation error (likely a policy error)');
          return true;
        }
        
        return false;
      }
      
      console.log('Created images bucket successfully');
      return true;
    }
  } catch (error) {
    console.error('Error in ensureImagesBucketExists:', error);
    return false;
  }
};
