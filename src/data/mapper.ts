import type { DevelopmentFormData, DevInfoChildData } from "./form";


export const toDevInfoChild = (form: DevelopmentFormData): DevInfoChildData => ({
propertyType: form.developmentType ?? "",
size: form.landArea ?? "",
location: form.location ?? "",
name: form.fullName ?? "",
phone: form.phoneNumber ?? "",
description: form.projectDescription ?? "",
});


export const fromDevInfoChild = (
child: DevInfoChildData,
prev: DevelopmentFormData
): DevelopmentFormData => ({
...prev,
developmentType: child.propertyType,
landArea: child.size,
location: child.location,
fullName: child.name,
phoneNumber: child.phone,
projectDescription: child.description,
});