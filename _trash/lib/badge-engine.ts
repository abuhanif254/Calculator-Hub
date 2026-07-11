import { db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function recalculateUserBadges(userId: string) {
  try {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    
    if (!snap.exists()) return;
    
    const data = snap.data();
    const reputation = data.reputation || 0;
    const currentBadges = data.badges || [];
    
    const newBadges = new Set(currentBadges);
    
    // Check reputation-based badges
    if (reputation >= 50) newBadges.add('rising_star');
    if (reputation >= 200) newBadges.add('pro_contributor');
    if (reputation >= 500) newBadges.add('expert');
    
    // NOTE: 'first_post', 'veteran', 'helpful', 'beloved' would optimally be calculated 
    // by aggregating stats across the user's posts, or awarded incrementally during post creation.
    // For this generic utility, we'll just handle reputation thresholds.
    
    const finalBadges = Array.from(newBadges);
    
    // Only update if there are changes to avoid unnecessary writes
    if (finalBadges.length !== currentBadges.length) {
      await updateDoc(userRef, { badges: finalBadges });
      console.log(`Awarded new badges to user ${userId}:`, finalBadges);
    }
    
    return finalBadges;
  } catch (err) {
    console.error("Failed to recalculate user badges:", err);
  }
}
