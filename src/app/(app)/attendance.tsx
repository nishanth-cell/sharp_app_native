import React from "react"; 
import { StyleSheet, View, } from "react-native"; 
import Screen from "../../primitives/Screen"; 
import Container from "../../primitives/Container"; 
import Column from "../../primitives/Column"; 
import Row from "../../primitives/Row"; 
import AppBottom from "../../components/AppBottom"; 
import AppCard from "../../components/AppCard"; 
import AppHeader from "../../components/AppHeader"; 
import AppText from "../../components/AppText"; 
import { useAppSelector } from "../../redux/hooks"; 
import theme from "../../theme"; 

export default function AttendanceScreen() 
{ const attendance = useAppSelector( (state) => state.attendance ); 
  const records = attendance.records; 
  return ( 
  <Screen>
     {/* <AppHeader title="Attendance" />  */}
    <Container style={styles.container}> 
    <Column gap="xl"> {/* Attendance Summary */} 
    <AppCard> 
      <Column gap="xs" align="center"> 
      <AppText size="xxxl" weight="bold" color={theme.colors.primary} align="center" >
       {attendance.rate}% </AppText> 
       <AppText
  size="sm"
  color={theme.colors.textSecondary}
  align="center"
>
  {`Across ${records.length} recorded ${
    records.length === 1 ? "day" : "days"
  }`}
</AppText>
 </Column> 
 </AppCard> 
 {/* Recent Days */} 
 <Column gap="md"> <AppText size="lg" weight="bold" > Recent Days </AppText> {records.length === 0 ? ( <AppCard> <AppText size="sm" color={theme.colors.textSecondary} align="center" > No attendance records found. </AppText> </AppCard> ) : ( <Column gap="md"> {records.map((record) => ( <AttendanceRecord key={record.id} date={record.att_date} status={record.status} reason={record.reason} /> ))} </Column> )} 
       </Column> </Column> </Container> <AppBottom /> </Screen> ); } 
       type AttendanceRecordProps = { date: string; status: string; reason: string | null; }; 
       function AttendanceRecord({ date, status, reason, }: AttendanceRecordProps) 
       { const isPresent = status === "Present"; return ( <AppCard>
         <Column gap="sm">
          <Row justify="space-between">
             <AppText size="md" weight="semibold" >
               {formatDate(date)} 
             </AppText> 
              
               <View style={[ styles.statusBadge, { backgroundColor: isPresent ? theme.colors.success : theme.colors.warning, }, ]} > 
                <AppText size="xs" weight="semibold" color={theme.colors.white} > {status} </AppText> 
                </View> 
               </Row>
                {reason && (
                   <AppText size="sm" color={theme.colors.textSecondary} >
                     {/* Reason: {reason}  */}
                     {reason} 
                   </AppText> )} 
                
                </Column> 
                
                </AppCard> 
                );
              
              } 
               function formatDate(date: string) { const parsedDate = new Date(date); if (Number.isNaN(parsedDate.getTime())) { return date; } return parsedDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", }); } 
               
               const styles = StyleSheet.create({ 
                container: { 
                  flex: 1, paddingTop: 
                  theme.spacing.lg, 
                }, 
                statusBadge: { 
                  paddingHorizontal: theme.spacing.md, 
                  paddingVertical: theme.spacing.xs, 
                  borderRadius: 20, 
                }, 
              
              });