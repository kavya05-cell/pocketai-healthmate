import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  AlertTriangle, 
  Plus, 
  X, 
  Calendar,
  Clock,
  TrendingUp
} from "lucide-react";

const commonSymptoms = [
  "Headache", "Fatigue", "Fever", "Cough", "Nausea", 
  "Dizziness", "Chest Pain", "Back Pain", "Anxiety", "Insomnia"
];

const recentSymptoms = [
  { id: 1, symptom: "Headache", severity: 6, date: "Today", time: "2:30 PM", notes: "Mild pressure behind eyes" },
  { id: 2, symptom: "Fatigue", severity: 4, date: "Yesterday", time: "4:00 PM", notes: "After long work session" },
  { id: 3, symptom: "Back Pain", severity: 7, date: "2 days ago", time: "9:15 AM", notes: "Lower back stiffness" },
];

export const SymptomTracker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState("");
  const [severity, setSeverity] = useState([5]);
  const [notes, setNotes] = useState("");

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const addCustomSymptom = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom)) {
      setSelectedSymptoms([...selectedSymptoms, customSymptom]);
      setCustomSymptom("");
    }
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => prev.filter(s => s !== symptom));
  };

  const getSeverityColor = (level: number) => {
    if (level <= 3) return "text-secondary";
    if (level <= 6) return "text-primary";
    return "text-destructive";
  };

  const getSeverityBg = (level: number) => {
    if (level <= 3) return "bg-secondary/10";
    if (level <= 6) return "bg-primary/10";
    return "bg-destructive/10";
  };

  return (
    <div className="space-y-6">
      {/* Log New Symptom */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Log New Symptom
          </CardTitle>
          <CardDescription>
            Track your symptoms to identify patterns and triggers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Common Symptoms */}
          <div>
            <label className="text-sm font-medium mb-3 block">Common Symptoms</label>
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map((symptom) => (
                <Badge
                  key={symptom}
                  variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => toggleSymptom(symptom)}
                >
                  {symptom}
                  {selectedSymptoms.includes(symptom) && (
                    <X className="h-3 w-3 ml-1" onClick={(e) => {
                      e.stopPropagation();
                      removeSymptom(symptom);
                    }} />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          {/* Custom Symptom */}
          <div>
            <label className="text-sm font-medium mb-3 block">Add Custom Symptom</label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter custom symptom..."
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomSymptom()}
              />
              <Button onClick={addCustomSymptom} size="icon" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Selected Symptoms */}
          {selectedSymptoms.length > 0 && (
            <div>
              <label className="text-sm font-medium mb-3 block">Selected Symptoms</label>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map((symptom) => (
                  <Badge key={symptom} variant="secondary" className="bg-primary/10 text-primary">
                    {symptom}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => removeSymptom(symptom)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Severity Scale */}
          <div>
            <label className="text-sm font-medium mb-3 block">
              Severity Level: <span className={getSeverityColor(severity[0])}>{severity[0]}/10</span>
            </label>
            <Slider
              value={severity}
              onValueChange={setSeverity}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Mild</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium mb-3 block">Additional Notes</label>
            <Textarea
              placeholder="Describe any additional details, triggers, or circumstances..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <Button className="w-full" variant="health">
            Log Symptoms
          </Button>
        </CardContent>
      </Card>

      {/* Recent Symptoms */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-secondary" />
            Recent Symptoms
          </CardTitle>
          <CardDescription>
            Your symptom history and patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSymptoms.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getSeverityBg(item.severity)} border-2 ${
                    item.severity <= 3 ? 'border-secondary' : 
                    item.severity <= 6 ? 'border-primary' : 'border-destructive'
                  }`}></div>
                  <div>
                    <p className="font-medium">{item.symptom}</p>
                    <p className="text-sm text-muted-foreground">{item.notes}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </div>
                  <div className={`font-medium ${getSeverityColor(item.severity)}`}>
                    Severity: {item.severity}/10
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};