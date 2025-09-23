export type DevelopmentFormData = {
developmentType: string;
projectStage: string;
landArea: string; // kept as string because UI uses range labels or free text
investmentBudget: number;
location: string;
expectedTimeline: string;
projectDescription: string;
partnershipRequirements: string;
fullName: string;
phoneNumber: string;
email: string;
currentLocation: string;
preferredContactTime: string;
urgencyLevel: string;
additionalComments: string;
agreeToTerms: boolean;
allowContact: boolean;
allowMarketing: boolean;
};


// Child view-model for DevelopmentInfoSection only
export type DevInfoChildData = {
propertyType: string;
size: string;
location: string;
name: string;
phone: string;
description: string;
};