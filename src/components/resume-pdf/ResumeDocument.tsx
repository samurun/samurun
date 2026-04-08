import path from 'node:path';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from '@react-pdf/renderer';

import { experiences } from '@/data/experiences';
import { resumeMeta } from '@/data/resume-meta';

// Disable automatic hyphenation so words don't break awkwardly mid-line
Font.registerHyphenationCallback((word) => [word]);

// Register Inter variable font (single TTF covers all weights via variation axis).
// Using a file path so the font is read once at build time, not fetched at request time.
const interPath = path.join(process.cwd(), 'src/components/resume-pdf/fonts/Inter.ttf');

Font.register({
  family: 'Inter',
  fonts: [
    { src: interPath, fontWeight: 400 },
    { src: interPath, fontWeight: 500 },
    { src: interPath, fontWeight: 600 },
    { src: interPath, fontWeight: 700 },
  ],
});

const COLOR = {
  text: '#1f1f1f',
  muted: '#666666',
  faint: '#888888',
  rule: '#c8c8c8',
  link: '#1a4fd6',
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 36,
    fontSize: 9,
    fontFamily: 'Inter',
    fontWeight: 400,
    color: COLOR.text,
    lineHeight: 1.4,
  },

  // Header
  name: {
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: 700,
    lineHeight: 1.15,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  title: {
    fontSize: 10.5,
    color: COLOR.muted,
    marginBottom: 5,
    lineHeight: 1.3,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 9,
    color: COLOR.muted,
    lineHeight: 1.4,
  },
  contactItem: {
    marginRight: 6,
  },
  link: {
    color: COLOR.link,
    textDecoration: 'none',
  },
  separator: {
    color: COLOR.faint,
    marginRight: 6,
  },

  // Section
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Inter',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: COLOR.muted,
    borderBottomWidth: 0.6,
    borderBottomColor: COLOR.rule,
    paddingBottom: 2,
    marginTop: 10,
    marginBottom: 5,
  },

  // Summary
  summary: {
    fontSize: 9,
    lineHeight: 1.45,
  },

  // Skills
  skillRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  skillLabel: {
    fontFamily: 'Inter',
    fontWeight: 700,
    width: 60,
    fontSize: 9,
  },
  skillItems: {
    flex: 1,
    fontSize: 9,
  },

  // Experience
  jobBlock: {
    marginBottom: 6,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: 700,
  },
  jobMeta: {
    fontSize: 8.5,
    color: COLOR.muted,
  },
  jobSubMeta: {
    fontSize: 8.5,
    color: COLOR.muted,
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 1.5,
  },
  bulletDot: {
    width: 8,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.4,
  },

  // Education
  eduDegree: {
    fontSize: 9.5,
    fontFamily: 'Inter',
    fontWeight: 700,
  },
  eduMeta: {
    fontSize: 9,
    color: COLOR.muted,
  },
});

function formatDateRange(start: string, end: string | null) {
  return `${start} – ${end ?? 'Present'}`;
}

function buildJobMeta(type: string, isRemote: boolean) {
  const parts = [type];
  if (isRemote) parts.push('Remote');
  return parts.join(' · ');
}

export function ResumeDocument() {
  return (
    <Document
      title={`${resumeMeta.name} — Resume`}
      author={resumeMeta.name}
      subject="Resume"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View>
          <Text style={styles.name}>{resumeMeta.name}</Text>
          <Text style={styles.title}>
            {resumeMeta.title} — {resumeMeta.location}
          </Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{resumeMeta.email}</Text>
            <Text style={styles.separator}>·</Text>
            <Text style={styles.contactItem}>{resumeMeta.phone}</Text>
            <Text style={styles.separator}>·</Text>
            {resumeMeta.links.map((link, idx) => (
              <View
                key={link.url}
                style={{ flexDirection: 'row', alignItems: 'baseline' }}
              >
                <Link src={link.url} style={[styles.link, styles.contactItem]}>
                  {link.label}
                </Link>
                {idx < resumeMeta.links.length - 1 && (
                  <Text style={styles.separator}>·</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Summary */}
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.summary}>{resumeMeta.summary}</Text>

        {/* Skills */}
        <Text style={styles.sectionTitle}>Skills</Text>
        {resumeMeta.skills.map((group) => (
          <View key={group.label} style={styles.skillRow}>
            <Text style={styles.skillLabel}>{group.label}</Text>
            <Text style={styles.skillItems}>{group.items.join(', ')}</Text>
          </View>
        ))}

        {/* Experience */}
        <Text style={styles.sectionTitle}>Experience</Text>
        {experiences.map((job) => (
          <View key={`${job.company}-${job.startDate}`} style={styles.jobBlock} wrap={false}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>
                {job.position} — {job.company}
              </Text>
              <Text style={styles.jobMeta}>
                {formatDateRange(job.startDate, job.endDate)}
              </Text>
            </View>
            <Text style={styles.jobSubMeta}>
              {buildJobMeta(job.type, job.isRemote)}
            </Text>
            {job.description.map((bullet, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Education */}
        <Text style={styles.sectionTitle}>Education</Text>
        <View>
          <Text style={styles.eduDegree}>{resumeMeta.education.degree}</Text>
          <Text style={styles.eduMeta}>
            {resumeMeta.education.school} · {resumeMeta.education.period}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
