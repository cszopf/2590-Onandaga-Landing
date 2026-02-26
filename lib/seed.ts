import { saveItem } from './storage';
import { Property } from './types';

const property: Property = {
  property_id: 'prop_2590_onandaga',
  address: '2590 Onandaga Dr, Columbus, OH 43221',
  mls_number: '224012345',
  listing_price: 9000000,
  listing_agent_name: 'Susanne Horner',
  listing_agent_email: 'susanne@susannehorner.com',
  listing_brokerage: 'Engel & Völkers Realty Advisors',
  offer_deadline: '2026-03-15T17:00:00Z',
  media_urls: ['https://www.dropbox.com/scl/fi/vhdn0nkx4imi1sqd52p11/DJI_20250918195323_0562_D.jpg?rlkey=d5e0gop4rd7rbzv2ehvzd9y8j&st=zdxw8w0r&dl=1'],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export async function seed() {
  await saveItem('properties', property, 'property_id');
}
