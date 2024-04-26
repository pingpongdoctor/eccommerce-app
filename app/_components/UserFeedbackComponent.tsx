import { InfiniteMovingCards } from './InfiniteMovingCards';
import { hardCodedUserFeedback } from '../utils/utils';

export default function UserFeedbackComponent() {
  return (
    <div className="xl:mx-auto xl:max-w-7xl">
      <h3 className="px-4 md:px-8 lg:px-12">What people say</h3>
      <InfiniteMovingCards
        items={hardCodedUserFeedback}
        speed="slow"
        pauseOnHover={false}
      />
    </div>
  );
}
