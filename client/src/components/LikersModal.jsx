import Modal from './Modal';
import Avatar from './Avatar';

const LikersModal = ({ isOpen, onClose, likers }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Liked by">
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {likers.map((liker) => (
          <div key={liker._id} className="flex items-center space-x-3">
            <Avatar src={liker.profilePic} alt={liker.name} />
            <span className="text-white">{liker.name}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default LikersModal;
