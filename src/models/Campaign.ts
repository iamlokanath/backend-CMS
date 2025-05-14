import mongoose, { Document, Schema } from 'mongoose';

export interface ICampaign extends Document {
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'deleted';
  leads: string[];
  accountIDs: string[];
}

const CampaignSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive', 'deleted'], default: 'active' },
  leads: [{ type: String }],
  accountIDs: [{ type: String }],
}, { timestamps: true });

export default mongoose.model<ICampaign>('Campaign', CampaignSchema); 