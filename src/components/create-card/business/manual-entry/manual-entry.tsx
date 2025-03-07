import Input from "../../../input";
import { CardFormData } from "../../../../types/card";

interface IManualEntry {
  formData: CardFormData;
  handleChange: (e: any) => void;
  setFormData: React.Dispatch<React.SetStateAction<CardFormData>>;
}

export default function ManualEntry({
  formData,
  handleChange,
  setFormData,
}: IManualEntry) {
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  return (
    <div className="space-y-4 py-4">
      <div className="flex gap-4 flex-1">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
          customRequired="required"
          className="flex-1"
        />

        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
          customRequired="required"
          className="flex-1"
        />
      </div>

      <Input
        label="Accreditations"
        name="accreditations"
        value={formData.accreditations}
        onChange={handleChange}
        placeholder="e.g., MBA, phD, CPA (separate with commas)"
      />

      <Input
        label="Company Name"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        placeholder="Enter your company name"
      />

      <Input
        label="Job Title"
        name="jobTitle"
        value={formData.jobTitle}
        onChange={handleChange}
        placeholder="e.g., Senior Software Engineer"
      />

      <Input
        label="Department"
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="e.g., Engineering, Sales, Marketing"
      />

      <Input
        label="Company Slogan"
        name="companySlogan"
        value={formData.companySlogan}
        onChange={handleChange}
        placeholder="Enter your company's slogan or tagline"
      />

      <Input
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="e.g., (555) 123-4567"
        description="Format: (XXX) XXX-XXXX or +X (XXX) XXX-XXXX"
        customRequired="optional"
      />

      <Input
        label="Email Address"
        name="emailAddress"
        value={formData.emailAddress}
        onChange={handleChange}
        placeholder="your.email@company.com"
        type="email"
        customRequired="optional"
      />

      <Input
        label="Website URL"
        name="websiteUrl"
        value={formData.websiteUrl}
        onChange={handleChange}
        placeholder="https://www.yourwebsite.com"
        description="Example: https://www.example.com or www.example.com"
        customRequired="optional"
      />

      <h1 className="py-2">Company Address</h1>

      <Input
        label="Street Address"
        name="street"
        value={formData.address.street}
        onChange={handleAddressChange}
        placeholder="123 Business Street"
      />

      <div className="flex gap-4 flex-1">
        <Input
          label="City"
          name="city"
          value={formData.address.city}
          onChange={handleAddressChange}
          placeholder="City"
          className="flex-1"
        />

        <Input
          label="State/Province"
          name="state"
          value={formData.address.state}
          onChange={handleAddressChange}
          placeholder="State/Province"
          className="flex-1"
        />
      </div>

      <div className="flex gap-4 flex-1">
        <Input
          label="ZIP/Postal Code"
          name="zip"
          value={formData.address.zip}
          onChange={handleAddressChange}
          placeholder="ZIP/Postal Code"
          className="flex-1"
        />

        <Input
          label="Country"
          name="country"
          value={formData.address.country}
          onChange={handleAddressChange}
          placeholder="Country"
          className="flex-1"
        />
      </div>
    </div>
  );
}
