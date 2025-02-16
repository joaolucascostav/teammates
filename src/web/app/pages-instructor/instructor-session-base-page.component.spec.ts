import { FeedbackSession } from "src/web/types/api-output";




it('should accept a valid string as session name and course IDs', () => {
    const fromSession: FeedbackSession = createTestFeedbackSession();
    const result$ = service.copyFeedbackSession(fromSession, 'New Session', 'CS101', 'CS100');
  
    result$.subscribe(result => {
      expect(result).toBeTruthy();
      expect(result.feedbackSessionName).toBe('New Session');
      expect(result.courseId).toBe('CS101');
    });
  });
  it('should not accept an empty string as session name or course IDs', () => {
    expect(() => service.copyFeedbackSession(testSession, '', 'newCourseId', 'oldCourseId'))
      .toThrowError('Session name cannot be empty');
  
    expect(() => service.copyFeedbackSession(testSession, 'newSession', '', 'oldCourseId'))
      .toThrowError('Course ID cannot be empty');
  
    expect(() => service.copyFeedbackSession(testSession, 'newSession', 'newCourseId', ''))
      .toThrowError('Old Course ID cannot be empty');
  });
  it('should not accept a string with only spaces', () => {
    expect(() => {
      component.copyFeedbackSession('   ', 'course1', 'oldCourse1');
    }).toThrowError('Session name cannot be empty or contain only spaces.');
    expect(() => {
      component.copyFeedbackSession('Valid Name', '   ', 'oldCourse1');
    }).toThrowError('Course ID cannot be empty or contain only spaces.');
  
    expect(() => {
      component.copyFeedbackSession('Valid Name', 'course1', '   ');
    }).toThrowError('Old course ID cannot be empty or contain only spaces.');
  });