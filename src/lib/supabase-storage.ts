
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
