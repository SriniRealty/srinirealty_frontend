"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  ExternalLink,
  FileText,
  ImageIcon,
  Check,
  MapPin,
  Calendar,
  User,
  Home,
  DollarSign,
  Compass,
  Hash,
  Loader2,
  ChevronRight,
  Eye,
  Save,
  StickyNote,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AdminSession {
  userId: string;
  username: string;
  role: string;
}

interface SubmissionDetailClientProps {
  submissionId: string;
  submissionType: string;
  session: AdminSession;
}

interface SubmissionData {
  id: string;
  type: string;
  stage?: string;
  created_at: string;
  processing_status: string;
  document_urls: string[];
  image_urls: string[];
  admin_notes?: string;
  [key: string]: any;
}

const DEAL_STAGES = [
  "Called",
  "First Meeting",
  "Second Meeting",
  "Deal Started",
  "Deal Closed",
];

export default function SubmissionDetailClient({
  submissionId,
  submissionType,
  session,
}: SubmissionDetailClientProps) {
  const [submission, setSubmission] = useState<SubmissionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("SubmissionDetailClient mounted with:", {
      submissionId,
      submissionType,
    });
    fetchSubmissionData();
  }, [submissionId, submissionType]);

  const fetchSubmissionData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(
        `Fetching submission data for ID: ${submissionId}, type: ${submissionType}`
      );

      const response = await fetch(
        `/api/admin/submissions/${submissionId}?type=${submissionType}`
      );

      console.log("API response status:", response.status);
      console.log(
        "API response headers:",
        response.headers.get("content-type")
      );

      if (!response.ok) {
        const responseText = await response.text();
        console.error("API error response:", responseText);

        try {
          const errorData = JSON.parse(responseText);
          throw new Error(errorData.error || "Failed to fetch submission");
        } catch (parseError) {
          throw new Error(
            `Server returned ${response.status}: ${responseText.substring(0, 200)}...`
          );
        }
      }

      const result = await response.json();
      console.log("Fetched submission data:", result.data);

      setSubmission(result.data);
      setNotes(result.data.admin_notes || "");

      // Set current stage based on submission data
      if (result.data.stage && DEAL_STAGES.includes(result.data.stage)) {
        const stageIndex = DEAL_STAGES.indexOf(result.data.stage);
        setCurrentStage(stageIndex);
        console.log(
          `Set current stage to: ${result.data.stage} (index: ${stageIndex})`
        );
      }
    } catch (err) {
      console.error("Error fetching submission:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load submission"
      );
    } finally {
      setLoading(false);
    }
  };

  const moveToNextStage = async () => {
    if (updating || currentStage >= DEAL_STAGES.length - 1 || !submission)
      return;

    const nextStageIndex = currentStage + 1;
    const nextStage = DEAL_STAGES[nextStageIndex];

    setUpdating(true);
    const previousStage = currentStage;

    console.log(`Moving to next stage: ${nextStage}`);

    // Optimistic update
    setCurrentStage(nextStageIndex);

    try {
      const response = await fetch("/api/admin/update-stage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: submission.id,
          type: submissionType,
          stage: nextStage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update stage");
      }

      // Update local submission data
      setSubmission((prev) => (prev ? { ...prev, stage: nextStage } : null));
      toast.success(`Moved to: ${nextStage}`);
    } catch (error) {
      // Revert optimistic update
      setCurrentStage(previousStage);
      toast.error("Failed to move to next stage");
      console.error("Stage update error:", error);
    } finally {
      setUpdating(false);
    }
  };

  const saveNotes = async () => {
    if (!submission) return;

    try {
      setSavingNotes(true);

      const response = await fetch("/api/admin/update-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: submission.id,
          type: submissionType,
          notes: notes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save notes");
      }

      // Update local submission data
      setSubmission((prev) => (prev ? { ...prev, admin_notes: notes } : null));
      toast.success("Notes saved successfully");
    } catch (error) {
      toast.error("Failed to save notes");
      console.error("Notes save error:", error);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const response = await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Logged out successfully");
        router.push("/admin/login");
        router.refresh();
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    } finally {
      setLoggingOut(false);
    }
  };

  const handleBackToDashboard = () => {
    router.push("/admin/dashboard");
    router.refresh(); // Force a refresh to ensure proper navigation
  };

  const getContactInfo = () => {
    if (!submission) return { name: "", phone: "" };
    return {
      name: submission.seller_name || submission.full_name || "Unknown",
      phone: submission.seller_phone || submission.phone || "",
    };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSubmissionTitle = () => {
    if (!submission) return "";

    switch (submissionType) {
      case "selling":
        return `${submission.property_type || "Property"} - ${submission.size || "N/A"} sq ft - ₹${submission.price || "N/A"}`;
      case "buying":
        return `Looking for ${submission.property_type || "Property"} - Budget: ${submission.budget_range || "N/A"}`;
      case "development":
        return `${submission.development_type || "Development"} - ${submission.project_size || "Size not specified"}`;
      default:
        return "Property Submission";
    }
  };

  const formatPhoneForWhatsApp = (phone: string) => {
    return phone.replace(/[^0-9]/g, "");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto p-6 md:p-8">
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            <span className="ml-3 text-lg text-gray-700">
              Loading submission details...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto p-6 md:p-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Submission Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {error || "The requested submission could not be found."}
            </p>
            <Button onClick={handleBackToDashboard} size="lg">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const contact = getContactInfo();
  const allFiles = [
    ...(submission.document_urls || []).map((url: string) => ({
      url,
      type: "document",
      name: url.split("/").pop()?.split("?")[0] || "Document",
    })),
    ...(submission.image_urls || []).map((url: string) => ({
      url,
      type: "image",
      name: url.split("/").pop()?.split("?")[0] || "Image",
    })),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Header - Mobile and Desktop */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          {/* Back Button - Top Left, Larger */}
          <Button
            variant="outline"
            size="lg"
            onClick={handleBackToDashboard}
            className="self-start bg-white hover:bg-blue-50 border-blue-200 shadow-sm text-base px-6 py-3"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </Button>

          {/* Centered Title */}
          <div className="text-center flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {contact.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-3">
              {getSubmissionTitle()}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="outline" className="capitalize bg-green-300 text-black text-sm px-3 py-1">
                {submissionType}
              </Badge>
              <Badge
                variant={
                  submission.stage === "completed"
                    ? "default"
                    : "secondary"
                }
                className={`text-sm px-3 py-1 ${submission.stage === "completed" ? "bg-green-600 text-white" : "bg-gradient-to-r from-orange-300 to-yellow-200 text-blue-800"}`}
              >
                {submission.stage}
              </Badge>
              {submission.custom_id && (
                <Badge
                  variant="outline"
                  className="font-mono text-sm px-3 py-1"
                >
                  {submission.custom_id}
                </Badge>
              )}
            </div>
          </div>

          <div className="md:w-32"></div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* First Row: Property Details and Contact Info Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Property Details */}
            <Card className="bg-white border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {submissionType === "selling" && (
                    <>
                      <div className="flex items-center gap-4">
                        <Home className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Property Type
                          </p>
                          <p className="text-lg text-gray-900 font-medium">
                            {submission.property_type || "Not specified"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="h-5 w-5 text-blue-500 flex items-center justify-center">
                          <span className="text-sm font-bold">ft²</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Size
                          </p>
                          <p className="text-lg text-gray-900 font-medium">
                            {submission.size
                              ? `${submission.size} sq ft`
                              : "Not specified"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">c
                        <DollarSign className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Price
                          </p>
                          <p className="text-lg text-gray-900 font-semibold">
                            ₹{submission.price || "Not specified"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Compass className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Facing
                          </p>
                          <p className="text-lg text-gray-900 font-medium">
                            {submission.facing || "Not specified"}
                          </p>
                        </div>
                      </div>

                      {submission.plot_number && (
                        <div className="flex items-center gap-4">
                          <Hash className="h-5 w-5 text-indigo-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-600">
                              Plot Number
                            </p>
                            <p className="text-lg text-gray-900 font-medium">
                              {submission.plot_number}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        <User className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Seller Type
                          </p>
                          <p className="text-lg text-gray-900 font-medium capitalize">
                            {submission.seller_type || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {submissionType === "buying" && (
                    <>
                      <div className="flex items-center gap-4">
                        <Home className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Property Type
                          </p>
                          <p className="text-lg text-gray-900 font-medium">
                            {submission.property_type || "Not specified"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="h-5 w-5 text-blue-500 flex items-center justify-center">
                          <span className="text-sm font-bold">ft²</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Size Preference
                          </p>
                          <p className="text-lg text-gray-900 font-medium">
                            {submission.size_preference || "Not specified"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Budget Range
                          </p>
                          <p className="text-lg text-gray-900 font-semibold">
                            {submission.budget_range || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {submissionType === "development" && (
                    <>
                      <div className="flex items-center gap-4">
                        <Home className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Development Type
                          </p>
                          <p className="text-lg text-gray-900 font-medium">
                            {submission.development_type || "Not specified"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="h-5 w-5 text-blue-500 flex items-center justify-center">
                          <span className="text-sm font-bold">ft²</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Project Size
                          </p>
                          <p className="text-lg text-gray-900 font-medium">
                            {submission.project_size || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Location
                      </p>
                      <p className="text-lg text-gray-900 font-medium">
                        {submission.location || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Calendar className="h-5 w-5 text-teal-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Submitted
                      </p>
                      <p className="text-base text-gray-900 font-medium">
                        {formatDate(submission.created_at)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description/Notes */}
                {(submission.description ||
                  submission.additional_requirements ||
                  submission.project_description) && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-600 mb-3">
                      Additional Notes
                    </p>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-base text-gray-900 whitespace-pre-wrap">
                        {submission.description ||
                          submission.additional_requirements ||
                          submission.project_description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Map Link */}
                {submission.location && (
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        const query = encodeURIComponent(submission.location);
                        window.open(
                          `https://www.google.com/maps/search/${query}`,
                          "_blank"
                        );
                      }}
                      className="bg-white hover:bg-blue-50 border-blue-200"
                    >
                      <MapPin className="h-5 w-5 mr-2" />
                      View on Map
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Uploaded Files */}
            <Card className="bg-white border-purple-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Uploaded Files ({allFiles.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {allFiles.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {allFiles.map((file, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors bg-white hover:bg-purple-50"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-14 h-14 flex items-center justify-center bg-purple-100 rounded-lg mb-3">
                            {file.type === "image" ? (
                              <ImageIcon className="h-7 w-7 text-purple-600" />
                            ) : (
                              <FileText className="h-7 w-7 text-red-600" />
                            )}
                          </div>
                          <p
                            className="text-sm text-gray-700 truncate w-full mb-3 font-medium"
                            title={file.name}
                          >
                            {file.name}
                          </p>
                          <div className="flex gap-2 w-full">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setPreviewFile(file.url)}
                              className="flex-1 text-sm h-8 bg-white hover:bg-blue-50 border-blue-200 text-blue-700"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Preview
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(file.url, "_blank")}
                              className="flex-1 text-sm h-8 bg-white hover:bg-gray-50 border-gray-300 text-gray-700"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Open
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">No files uploaded</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Second Row: Uploaded Files and Deal Tracker Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <Card className="bg-white border-green-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {contact.name}
                  </h3>
                  <p className="text-lg text-gray-700">{contact.phone}</p>
                </div>

                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base py-3"
                    onClick={() => window.open(`tel:${contact.phone}`, "_self")}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-white text-base py-3"
                    onClick={() => window.open(`sms:${contact.phone}`, "_self")}
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Send SMS
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-green-300 text-green-700 hover:bg-green-50 bg-white text-base py-3"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${formatPhoneForWhatsApp(contact.phone)}`,
                        "_blank"
                      )
                    }
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Deal Tracker */}
            <Card className="bg-white border-indigo-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
                <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                  Deal Tracker
                  {updating && (
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {DEAL_STAGES.map((stage, index) => (
                    <div key={stage} className="flex items-center gap-4">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                          index <= currentStage
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-white border-gray-300 text-gray-400"
                        }`}
                      >
                        {index < currentStage ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <span className="text-base font-medium">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-medium text-base ${index <= currentStage ? "text-gray-900" : "text-gray-500"}`}
                        >
                          {stage}
                        </p>
                        {index === currentStage && (
                          <p className="text-sm text-blue-600 font-medium">
                            Current Stage
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Move to Next Step Button */}
                  {currentStage < DEAL_STAGES.length - 1 && (
                    <div className="pt-6 border-t border-gray-200">
                      <Button
                        onClick={moveToNextStage}
                        disabled={updating}
                        size="lg"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base py-3"
                      >
                        {updating ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Moving...
                          </>
                        ) : (
                          <>
                            <ChevronRight className="h-5 w-5 mr-2" />
                            Move to Next Step: {DEAL_STAGES[currentStage + 1]}
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {currentStage === DEAL_STAGES.length - 1 && (
                    <div className="pt-6 border-t border-gray-200">
                      <div className="text-center p-6 bg-green-50 rounded-lg">
                        <Check className="h-8 w-8 text-green-600 mx-auto mb-3" />
                        <p className="text-green-800 font-semibold text-lg">
                          Deal Completed!
                        </p>
                        <p className="text-green-600 text-base">
                          All stages completed successfully.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Third Row: Process Notes */}
          <Card className="bg-white border-orange-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                <StickyNote className="h-6 w-6 text-orange-600" />
                Process Notes & Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <Textarea
                  placeholder="Write down process updates, meeting notes, client feedback, next steps, or any important information about this submission..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[150px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base"
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Notes are automatically saved and will be stored with this
                    submission record.
                  </p>
                  <Button
                    onClick={saveNotes}
                    disabled={savingNotes}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                  >
                    {savingNotes ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5 mr-2" />
                        Save Notes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* File Preview Dialog - 600x600 Aspect Ratio */}
        <Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
          <DialogContent className="max-w-2xl w-[90vw] h-auto p-0">
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="text-xl font-semibold">
                File Preview
              </DialogTitle>
            </DialogHeader>
            {previewFile && (
              <div className="p-6 pt-0">
                <div className="w-full h-[600px] flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                  {previewFile.toLowerCase().includes(".pdf") ? (
                    <iframe
                      src={previewFile}
                      className="w-full h-full border-0 rounded"
                      title="PDF Preview"
                    />
                  ) : (
                    <img
                      src={previewFile || "/placeholder.svg"}
                      alt="File preview"
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "/placeholder.svg?height=400&width=400&text=Preview+Not+Available";
                      }}
                    />
                  )}
                </div>
                <div className="flex justify-center mt-6">
                  <Button
                    onClick={() => window.open(previewFile, "_blank")}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Open in New Tab
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
