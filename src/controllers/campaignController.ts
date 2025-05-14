import { Request, Response } from 'express';
import Campaign from '../models/Campaign';

export const getAllCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await Campaign.find({ status: { $ne: 'deleted' } });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getCampaignById = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign || campaign.status === 'deleted') {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const { name, description, status, leads, accountIDs } = req.body;
    const campaign = new Campaign({ name, description, status, leads, accountIDs });
    await campaign.save();
    res.status(201).json(campaign);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status: 'deleted' },
      { new: true }
    );
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json({ message: 'Campaign deleted (soft delete)' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 