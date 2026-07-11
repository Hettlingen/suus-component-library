import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./button/Button";
import Checkbox from "./checkbox/Checkbox";
import Chip from "./chip/Chip";
import DatePicker from "./date-picker/DatePicker";
import Dropdown from "./dropdown/Dropdown";
import IconButton from "./icon-button/IconButton";
import Link from "./link/Link";
import Password from "./password/Password";
import RadioButton from "./radiobutton/RadioButton";
import Switch from "./switch/Switch";
import TextField from "./textfield/TextField";
import Upload from "./upload/Upload";

const sectionStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "32px",
};

const sectionLabelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#888",
    borderBottom: "1px solid #e5e5e5",
    paddingBottom: "6px",
    marginBottom: "4px",
};

const rowStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    alignItems: "flex-start",
};

const iconEditSvg = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const iconTrashSvg = (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
);

const dropdownOptions = [
    { label: "Sugarcane", value: "sugarcane" },
    { label: "Tamarind", value: "tamarind" },
    { label: "Guaraná", value: "guarana" },
    { label: "Ice Tea", value: "icetea" },
];

const radioOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
];

function FormOverview() {
    return (
        <div style={{ padding: "32px", maxWidth: "600px", fontFamily: "sans-serif" }}>

            {/* TextField */}
            <div style={sectionStyle}>
                <div style={sectionLabelStyle}>TextField</div>
                <TextField label="Vorname" name="firstName" placeholder="Martin" />
                <TextField label="E-Mail" name="email" placeholder="deine@email.ch" required />
                <TextField label="Fehler-Zustand" name="emailError" placeholder="deine@email.ch" error="Bitte gib eine gültige E-Mail-Adresse ein." />
                <TextField label="Deaktiviert" name="disabled" placeholder="Nicht verfügbar" disabled />
            </div>

            {/* Password */}
            <div style={sectionStyle}>
                <div style={sectionLabelStyle}>Password</div>
                <Password label="Passwort" name="password" placeholder="Dein Passwort" />
                <Password label="Fehler-Zustand" name="passwordError" placeholder="Dein Passwort" error="Passwort ist zu kurz." />
                <Password label="Deaktiviert" name="passwordDisabled" placeholder="Nicht verfügbar" disabled />
            </div>

            {/* Dropdown */}
            <div style={sectionStyle}>
                <div style={sectionLabelStyle}>Dropdown</div>
                <Dropdown label="Geschmack" name="flavour" options={dropdownOptions} placeholder="Bitte auswählen" />
                <Dropdown label="Fehler-Zustand" name="flavourError" options={dropdownOptions} placeholder="Bitte auswählen" error="Bitte wähle einen Geschmack." />
                <Dropdown label="Deaktiviert" name="flavourDisabled" options={dropdownOptions} disabled />
            </div>

            {/* DatePicker */}
            <div style={sectionStyle}>
                <div style={sectionLabelStyle}>DatePicker</div>
                <DatePicker label="Geburtsdatum" name="birthday" />
                <DatePicker label="Fehler-Zustand" name="birthdayError" error="Bitte gib ein gültiges Datum ein." />
                <DatePicker label="Deaktiviert" name="birthdayDisabled" disabled />
            </div>

            {/* RadioButton */}
            <div style={sectionStyle}>
                <div style={sectionLabelStyle}>RadioButton</div>
                <RadioButton label="Wähle eine Option" name="radioDefault" options={radioOptions} defaultValue="option1" />
                <RadioButton label="Fehler-Zustand" name="radioError" options={radioOptions} error="Bitte wähle eine Option." />
                <RadioButton label="Deaktiviert" name="radioDisabled" options={radioOptions} defaultValue="option1" disabled />
            </div>

            {/* Checkbox */}
            <div style={sectionStyle}>
                <div style={sectionLabelStyle}>Checkbox</div>
                <Checkbox name="cbDefault" label="Ich akzeptiere die AGB" />
                <Checkbox name="cbChecked" label="Bereits ausgewählt" defaultChecked />
                <Checkbox name="cbError" label="Fehler-Zustand" error="Bitte akzeptiere die AGB." />
                <Checkbox name="cbDisabled" label="Deaktiviert" disabled />
            </div>

            {/* Switch */}
            <div style={sectionStyle}>
                <div style={sectionLabelStyle}>Switch</div>
                <Switch name="switchDefault" label="Benachrichtigungen aktivieren" />
                <Switch name="switchChecked" label="Bereits aktiviert" defaultChecked />
                <Switch name="switchDisabled" label="Deaktiviert" disabled />
            </div>

            {/* Chip */}
            <div style={sectionStyle}>
                <div style={sectionLabelStyle}>Chip</div>
                <div style={rowStyle}>
                    <Chip>Bio</Chip>
                    <Chip defaultChecked>Ausgewählt</Chip>
                    <Chip clickable={false}>Nicht klickbar</Chip>
                </div>
            </div>

            {/* Button */}
            <div style={sectionStyle}>
                <div style={sectionLabelStyle}>Button</div>
                <div style={rowStyle}>
                    <Button label="Primary" variant="primary" colorToken="--color-juice-sugarcane" />
                    <Button label="Secondary" variant="secondary" />
                    <Button label="Deaktiviert" variant="primary" disabled />
                    <Button label="Loading" variant="primary" loading />
                </div>
            </div>

            {/* IconButton */}
            <div style={sectionStyle}>
                <div style={sectionLabelStyle}>IconButton</div>
                <div style={rowStyle}>
                    <IconButton label="Bearbeiten" icon={iconEditSvg} />
                    <IconButton label="Löschen" icon={iconTrashSvg} />
                    <IconButton label="Aktiv" icon={iconEditSvg} active />
                    <IconButton label="Deaktiviert" icon={iconEditSvg} disabled />
                    <IconButton label="Kein Rahmen" icon={iconEditSvg} frame={false} />
                </div>
            </div>

            {/* Link */}
            <div style={sectionStyle}>
                <div style={sectionLabelStyle}>Link</div>
                <Link href="#">Zum Shop</Link>
                <Link href="#" showArrow={false}>Ohne Pfeil</Link>
                <Link href="https://suus.ch" newTab>Externer Link (neuer Tab)</Link>
            </div>

            {/* Upload */}
            <div style={sectionStyle}>
                <div style={sectionLabelStyle}>Upload</div>
                <Upload label="Avatar hochladen" name="avatarDefault" />
                <Upload label="Fehler-Zustand" name="avatarError" error="Bitte lade ein Bild hoch." />
                <Upload label="Deaktiviert" name="avatarDisabled" disabled />
            </div>

        </div>
    );
}

const meta = {
    title: "Form/Übersicht",
    component: FormOverview,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: "Übersicht aller Form-Komponenten in ihren wichtigsten Zuständen.",
            },
        },
    },
} satisfies Meta<typeof FormOverview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Alle: Story = {};
