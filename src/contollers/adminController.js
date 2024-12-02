import { Assignment } from '../models/Assignment.js';

export const uploadAssignment = async (req, res) => {
  try {
    const { userId, task, admin } = req.body;
    const assignment = new Assignment({ userId, task, admin });
    await assignment.save();
    res.status(201).json({ message: 'Assignment uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading assignment', error });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate('userId').populate('admin');
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving assignments', error });
  }
};

export const acceptAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'Accepted' }, { new: true });
    res.status(200).json({ message: 'Assignment accepted successfully', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting assignment', error });
  }
};

export const rejectAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'Rejected' }, { new: true });
    res.status(200).json({ message: 'Assignment rejected successfully', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting assignment', error });
  }
};
